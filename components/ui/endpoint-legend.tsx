interface EndpointLegendItem {
  name: string;
  value: number;
  color: string;
}

interface EndpointLegendProps {
  items: EndpointLegendItem[];
}

export function EndpointLegend({ items }: EndpointLegendProps) {
  return (
    <div className="mt-4 space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }} 
            />
            <span className="text-muted-foreground">{item.name}</span>
          </div>
          <span className="font-medium text-foreground">
            {item.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
} 