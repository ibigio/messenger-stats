import { Line } from 'react-chartjs-2';
import styles from './my_pie.module.css';
import { numberWithCommas } from '../util';
import 'chartjs-plugin-deferred';

export default function MyLine({ data }) {

    const { title, units, values, labels } = data;

    const start1 = 0;
    const end1 = 700;

    const dataFunc = canvas => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(start1, start1, end1, end1);
        gradient.addColorStop(0, '#0099ff');
        gradient.addColorStop(0.5, '#a033ff');
        gradient.addColorStop(0.8, '#ff5280');
        gradient.addColorStop(0.9, '#ff7061');
        return {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: gradient,
            }],
        }
    };

    const options = {
        legend: {
            display: false
        },
        plugins: {
            deferred: { yOffset: '80%' }
        }
    }

    return (
        <div>
            <p className={styles.title}>
                <div className={styles.colorful}>{numberWithCommas(units)}</div> <br /> {title}
            </p>
            <div>
                <Line data={dataFunc} options={options} />
            </div>
        </div>
    );
}