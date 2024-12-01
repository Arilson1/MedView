import { useEffect, useRef, useState } from 'react';

import Hammer from 'hammerjs';
import cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
import cornerstoneMath from 'cornerstone-math';
import cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import dicomParser from 'dicom-parser';

import { Toolbar } from '../ui/Toolbar';
import styles from './viewer.module.css';

export function Viewer() {
    const viewerRef = useRef(null);

    const [imagemId, setImagemId] = useState(null);
    const [activeTool, setActiveTool] = useState(null);

    useEffect(() => {

        // Configurar o loader com bibliotecas externas
        cornerstoneTools.external.cornerstone = cornerstone;
        cornerstoneTools.external.Hammer = Hammer;
        cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
        cornerstoneWebImageLoader.external.cornerstone = cornerstone;
        cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
        cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
        cornerstoneTools.init();

        const element = viewerRef.current;
        cornerstone.enable(element);

        return () => {
            cornerstone.disable(element);
        };
    }, []);

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Delete' || event.key === 'Backspace') {
                deleteSelectedMeasurement();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const element = viewerRef.current;

        async function loadImagem() {
            if (!imagemId) return;

            try {
                cornerstone.enable(element);

                cornerstoneTools.addToolForElement(element, cornerstoneTools.PanTool);
                cornerstoneTools.addToolForElement(element, cornerstoneTools.WwwcTool);
                cornerstoneTools.addToolForElement(element, cornerstoneTools.LengthTool);
                cornerstoneTools.addToolForElement(element, cornerstoneTools.ZoomTool, {
                    configuration: {
                        minScale: 0.1,
                        maxScale: 20.0,
                        preventZoomOutsideImage: false,
                    }
                });

                const imagemCarregada = await cornerstone.loadAndCacheImage(imagemId);
                cornerstone.displayImage(element, imagemCarregada);
            } catch (error) {
                console.error("Erro ao carregar a imagem:", error);
            }
        }

        loadImagem();

        return () => {
            if (element) {
                cornerstone.disable(element);
            }
        };
    }, [imagemId]);

    function handleFileChange(e) {
        const imagem = e.target.files[0];
        if (!imagem) return;

        const dicomImagemId = cornerstoneWADOImageLoader.wadouri.fileManager.add(imagem);
        setImagemId(dicomImagemId);
    }

    function changeActiveTool(toolName) {
        const element = viewerRef.current;
        cornerstoneTools.setToolActiveForElement(element, toolName, { mouseButtonMask: 1 });
        setActiveTool(toolName);
    }

    function deleteSelectedMeasurement() {
        const element = viewerRef.current;
        if (!element) return;

        // Obtém o estado da ferramenta ativa
        const toolState = cornerstoneTools.getToolState(element, 'Length'); // Alterar se estiver usando outra ferramenta
        if (!toolState || !toolState.data.length) return;

        // Filtra medidas que NÃO estão selecionadas
        const remainingMeasurements = toolState.data.filter(measurement => !measurement.active);

        // Atualiza o estado da ferramenta
        toolState.data = remainingMeasurements;
        cornerstone.updateImage(element);
    }

    function resetView() {
        const element = viewerRef.current;
        if (!element) return;

        const enabledElement = cornerstone.getEnabledElement(element);

        if (enabledElement) {
            // Reseta o viewport para as configurações padrão
            cornerstone.fitToWindow(element);
            enabledElement.viewport.translation = { x: 0, y: 0 };
            enabledElement.viewport.rotation = 0; // Caso exista rotação
            enabledElement.viewport.hflip = false; // Remove qualquer flip horizontal
            enabledElement.viewport.vflip = false; // Remove qualquer flip vertical

            cornerstone.updateImage(element);
        }
    }

    return (
        <>
            <input type="file" onChange={handleFileChange} accept=".dcm" />
            <Toolbar
                activeTool={activeTool}
                disable={!imagemId}
                onZoom={() => changeActiveTool('Zoom')}
                onPan={() => changeActiveTool('Pan')}
                onWwwc={() => changeActiveTool('Wwwc')}
                onLength={() => changeActiveTool('Length')}
                onResetView={() => resetView()}
            />
            <div ref={viewerRef} className={styles.viewerContainer}></div>
        </>
    );
}