import { useState } from 'react';

import styles from './tabs.module.css';

export function Tabs() {
    const [tab, setTab] = useState('metadata');

    return (
        <div className={styles.tabConatainer}>
            <nav className={styles.tabNav}>
                <button
                    className={`${styles.tabButton} ${tab === 'metadata' ? styles.active : ''}`}
                    onClick={() => setTab('metadata')}
                >
                    Metadata
                </button>
                <button
                    className={`${styles.tabButton} ${tab === 'ai' ? styles.active : ''}`}
                    onClick={() => setTab('ai')}
                >
                    AI
                </button>
            </nav>
            <div className={styles.tabContent}>
                {tab === 'metadata' ? (
                    <div className={styles.metadataContent}>
                        <h2>Metadata</h2>
                        <p>Informações sobre os dados disponíveis.</p>
                    </div>
                ) : (
                    <div className={styles.aiContent}>
                        <h2>AI</h2>
                        <p>Resultados gerados pela inteligência artificial.</p>
                    </div>
                )}
            </div>
        </div>
    );
}