import { ArrowsOutCardinal, CircleHalf, MagnifyingGlass, ArrowClockwise, Ruler } from "@phosphor-icons/react";
import styles from './toolbar.module.css';
import { Button } from "../Button";

export function Toolbar({ activeTool, disable, onZoom, onPan, onWwwc, onLength, onResetView }) {

    return (
        <div className={styles.toolbar}>
            <Button onClick={onPan} active={activeTool === 'Pan'} disabled={disable} title="Arrastar">
                <ArrowsOutCardinal size={22} />
            </Button>
            <Button onClick={onWwwc} active={activeTool === 'Wwwc'} disabled={disable} title='Window Level'>
                <CircleHalf size={22} />
            </Button>
            <Button onClick={onZoom} active={activeTool === 'Zoom'} disabled={disable} title='Zoom'>
                <MagnifyingGlass size={22} />
            </Button>
            <Button onClick={onLength} active={activeTool === 'Length'} disabled={disable} title='Tamanho'>
                <Ruler size={22} />
            </Button>
            <Button onClick={onResetView} disabled={disable} title='Resete View'>
                <ArrowClockwise size={22} />
            </Button>
        </div>
    );
}