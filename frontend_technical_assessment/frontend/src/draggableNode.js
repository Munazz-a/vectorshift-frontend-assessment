// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`
        ${type}
        px-4 py-3
        min-w-20
        rounded-base
        bg-navy-700 hover:bg-navy-800
        text-white text-sm font-medium
        cursor-grab active:cursor-grabbing
        transition-all duration-200
        select-none
        shadow-sm hover:shadow-md
        border border-navy-600
        hover:border-navy-500
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {label}
    </div>
  );
};