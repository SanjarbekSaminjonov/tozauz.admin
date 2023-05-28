import "./chart.scss"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


type Props = {
    data: {
        name: string,
        earning: number,
        payout: number
        payme: number
    }[]
}


const Chart = ({ data }: Props) => {
    return (
        <div className="chart">
            <div className="title">Oxirgi 12 oy ma'lumotlari</div>
            <ResponsiveContainer width="100%" aspect={3 / 1}>
                <AreaChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorPayout" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPayme" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#126dff" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#126dff" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorEarning" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" name="To'langan" dataKey="payout" stroke="#8884d8" fillOpacity={1} fill="url(#colorPayout)" />
                    <Area type="monotone" name="Pul so'rovi" dataKey="payme" stroke="#126dff" fillOpacity={1} fill="url(#colorPayme)" />
                    <Area type="monotone" name="Daromad" dataKey="earning" stroke="#82ca9d" fillOpacity={1} fill="url(#colorEarning)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart