# backend/main.py
# Updated for Part 4: DAG validation with Kahn's Algorithm

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Enable CORS so frontend can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# REQUEST/RESPONSE MODELS

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, Any]
    data: Dict[str, Any]

class Edge(BaseModel):
    source: str
    target: str
    id: str = ""

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

# DAG CHECKING ALGORITHM (Kahn's Algorithm)


def is_directed_acyclic_graph(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the pipeline forms a Directed Acyclic Graph (DAG).
    Uses Kahn's Algorithm for topological sorting.
    
    A DAG has no cycles. If there's a cycle, the pipeline would run forever,
    so we must detect and prevent it.
    
    Algorithm:
    1. Build graph with in-degree count for each node
    2. Start with nodes that have no incoming edges
    3. Remove edges and update in-degrees
    4. If all nodes are processed, it's a DAG (no cycle)
    5. If nodes remain, they're part of a cycle
    
    Args:
        nodes: List of pipeline nodes
        edges: List of pipeline edges (connections)
        
    Returns:
        True if no cycles exist (valid DAG)
        False if cycle detected
    """
    
    # Build data structures
    node_ids = {node.id for node in nodes}
    in_degree = {node.id: 0 for node in nodes}
    adjacency_list = {node.id: [] for node in nodes}
    
    # Count incoming edges for each node
    for edge in edges:
        # Only count if both source and target exist in nodes
        if edge.source in node_ids and edge.target in node_ids:
            adjacency_list[edge.source].append(edge.target)
            in_degree[edge.target] += 1
    
    # Find all nodes with no incoming edges (starting nodes)
    queue = [node_id for node_id in in_degree if in_degree[node_id] == 0]
    processed_count = 0
    
    # Process nodes using Kahn's Algorithm
    while queue:
        # Remove first node from queue
        current_node = queue.pop(0)
        processed_count += 1
        
        # Process all edges from current node
        for neighbor in adjacency_list[current_node]:
            in_degree[neighbor] -= 1
            
            # If neighbor now has no incoming edges, add to queue
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If all nodes were processed, no cycle exists
    # If some nodes remain, they're part of a cycle
    return processed_count == len(nodes)


# API ENDPOINTS


@app.post("/pipelines/parse", response_model=PipelineResponse)
async def parse_pipeline(request: PipelineRequest):
    """
    Validate and analyze a pipeline.
    
    This endpoint receives a pipeline with nodes and edges,
    and validates:
    1. Number of nodes
    2. Number of edges
    3. Whether it forms a valid DAG (no cycles)
    
    Args:
        request: PipelineRequest containing:
            - nodes: List of node objects from the pipeline
            - edges: List of edge objects (connections)
        
    Returns:
        PipelineResponse containing:
            - num_nodes: Total number of nodes
            - num_edges: Total number of edges
            - is_dag: True if valid DAG, False if cycle detected
            
    Example:
        Request:
        {
            "nodes": [
                {"id": "input-1", "type": "customInput", ...},
                {"id": "text-1", "type": "text", ...},
                {"id": "output-1", "type": "customOutput", ...}
            ],
            "edges": [
                {"source": "input-1", "target": "text-1", ...},
                {"source": "text-1", "target": "output-1", ...}
            ]
        }
        
        Response:
        {
            "num_nodes": 3,
            "num_edges": 2,
            "is_dag": true
        }
    """
    
    # Count nodes and edges
    num_nodes = len(request.nodes)
    num_edges = len(request.edges)
    
    # Check if pipeline is a DAG (no cycles)
    is_dag = is_directed_acyclic_graph(request.nodes, request.edges)
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag,
    )

