import styles from './word_list.module.css';
import { numberWithCommas, unpack } from '../util';

const Entry = ({ word, count, index, isEqual }) => (
    <div>
        <div className={isEqual ? styles.equal : ''}>
            <div className={styles.grid}>
                <span className={styles.colorful}>{index}.</span>
                <span className={styles.word}> {decodeURIComponent(escape(word))} </span>
                <span className={styles.count} >{numberWithCommas(count)}</span>
            </div>
        </div>
        <div className={styles.line}></div>
    </div>
);

const WordList = ({ wordFreqs, firstName, eqs }) => (
    <div>
        {console.log(wordFreqs.slice(0, 50).map(wf => unpack(wf.word)))}
        <div className={styles.title}>
            <div className={styles.colorful2}>
                {firstName}'s
                </div><br />
            Favorite Words
            </div>
        <div className={styles.border} >
            <div className={styles.container}>
                {wordFreqs.slice(0, 500).map((wf, index) => (
                    <Entry word={wf.word} count={wf.count} index={index + 1} isEqual={eqs[wf.word]} />
                ))}
            </div>
        </div>
    </div>
);

export default WordList;