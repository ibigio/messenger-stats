import { Pie } from 'react-chartjs-2';
import styles from './my_pie.module.css';
import { numberWithCommas } from '../util';
import 'chartjs-plugin-deferred';

export default function MyPie({ data }) {

    const { title, units, values, labels } = data;

    const start1 = 0;
    const end1 = 250;

    const start2 = 200;
    const end2 = 275;

    const dataFunc = canvas => {
        const ctx = canvas.getContext("2d");
        const gradient1 = ctx.createLinearGradient(start1, start1, end1, end1);
        gradient1.addColorStop(0, '#0099ff');
        gradient1.addColorStop(1, '#a033ff');
        const gradient2 = ctx.createLinearGradient(start2, start2, end2, end2);
        gradient2.addColorStop(0, '#ff5280');
        gradient2.addColorStop(1, '#ff7061');
        return {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    gradient2,
                    gradient1,
                ],
            }],
        }
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
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
                <Pie data={dataFunc} options={options} />
            </div>
        </div>
    );
}