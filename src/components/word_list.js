import styles from './word_list.module.css';
import { numberWithCommas } from '../util';

const Entry = ({ word, count, index }) => (
    <div>
        <div className={styles.grid}>
            <span className={styles.colorful}>{index}.</span>
            <span className={styles.word}> {word} </span>
            <span className={styles.count} >{numberWithCommas(count)}</span>
        </div>
        <div className={styles.line}></div>
    </div>
);

const WordList = ({ wordFreqs, firstName }) => (
    <div>
        <div className={styles.title}>
            <div className={styles.colorful2}>
                {firstName}'s
                </div><br/>
            Favorite Words
            </div>
        <div className={styles.border} >
            <div className={styles.container}>
                {wordFreqs.slice(0, 500).map((wf, index) => (
                    <Entry word={wf.word} count={wf.count} index={index + 1} />
                ))}
            </div>
        </div>
    </div>
);

export default WordList;