import { Header } from "../ui/Header";
import { Tabs } from "../ui/Tabs";
import { Viewer } from "../Viewer";
import styles from "./dicomViewer.module.css";

export function DicomViewer() {

  return (
    <div className={styles.dicomContainer}>
      <Header />
      <div className={styles.container}>
        <div style={{ width: '80vw', }}>
          <Viewer />
        </div>
        <Tabs />
      </div>
    </div>
  )
}