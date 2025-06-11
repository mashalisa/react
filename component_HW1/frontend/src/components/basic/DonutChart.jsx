import { PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';

const DonutChart = ({ data, theme}) => {
    const colorBar = [
        {'color': 'cyan', 'number': '#00FFFF', isUsed: false},
        {'color': 'navy', 'number': '#000080', isUsed: false},
        {'color': 'magenta', 'number': '#FF00FF', isUsed: false},
        {'color': 'fuchsia', 'number': '#FF00FF', isUsed: false},
        {'color': 'purple', 'number': '#800080', isUsed: false},
        {'color': 'pink', 'number': '#FFC0CB', isUsed: false},
        {'color': 'red', 'number': '#FF0000', isUsed: false},
        {'color': 'orange', 'number': '#FFA500', isUsed: false},
        {'color': 'yellow', 'number': '#FFFF00', isUsed: false},
        {'color': 'green', 'number': '#008000', isUsed: false},
        {'color': 'blue', 'number': '#0000FF', isUsed: false},
        {'color': 'brown', 'number': '#A52A2A', isUsed: false},
        {'color': 'gray', 'number': '#808080', isUsed: false},
        {'color': 'black', 'number': '#000000', isUsed: false},
        {'color': 'white', 'number': '#FFFFFF', isUsed: false},
        {'color': 'army', 'number': '#4B5320', isUsed: false},
        {'color': 'teal', 'number': '#008080', isUsed: false}
    ]
    console.log(data, 'data in donut chart')
    const themeColor = colorBar.find(c => c.color === theme)?.number || '#CCCCCC';
    const total = data.reduce((sum, entry) => sum + entry.value, 0);
  
    return (
        <div className='donutContainer'>
         <ResponsiveContainer width={240} height={240}>
 <PieChart >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={85}
          outerRadius={120}
          paddingAngle={2}
          dataKey="value"
        >
           {data.map((entry, index) => {
          const color = colorBar.find(c => c.color === entry.theme)?.number || colorBar[index % colorBar.length].number;
          return <Cell key={`cell-${index}`} fill={color} />;
        })}
     
        </Pie>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={32}
          fontWeight="bold"
        >
          ${total}
        </text>
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
          fill="#666"
        >
          {/* of $975 limit */}
        </text>
      </PieChart>
        </ResponsiveContainer>
        </div>
       
  
    );

  
  };
  
  export default DonutChart;