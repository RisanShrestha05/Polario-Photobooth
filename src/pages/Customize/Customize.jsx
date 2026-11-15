import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageFrame from '../../components/layout/PageFrame.jsx';
import Customizer from '../../components/customize/Customizer.jsx';
import StripCanvas from '../../components/customize/StripCanvas.jsx';
import PrinterAnimation from '../../components/download/PrinterAnimation.jsx';
import ClipViewer from '../../components/viewer/ClipViewer.jsx';
import { useBooth } from '../../context/BoothContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { usePrintAnimation } from '../../hooks/usePrintAnimation.js';
import { renderStripBlob } from '../../utils/canvas.js';
import { downloadBlob, stripFilename } from '../../utils/download.js';
import styles from './Customize.module.css';

export default function Customize() {
  const navigate = useNavigate();
  const { state, dispatch } = useBooth();
  const { showToast } = useToast();
  const { cols, rows, photos, caption, frameColor, captionColor } = state;
  const print = usePrintAnimation();
  const [exportUrl, setExportUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const blobRef = useRef(null);

  useEffect(() => () => exportUrl && URL.revokeObjectURL(exportUrl), [exportUrl]);

  const options = { cols, rows, frameColor, caption, captionColor };

  const saveFile = () => {
    if (!blobRef.current) return;
    downloadBlob(blobRef.current, stripFilename());
    showToast('Polaroid saved');
  };

  const onDownload = async () => {
    setBusy(true);
    try {
      const blob = await renderStripBlob(photos, options);
      blobRef.current = blob;
      setExportUrl(URL.createObjectURL(blob));
      print.start(saveFile);
    } catch {
      showToast('Could not create the image. Try fewer photos or retake them.', 'error');
    } finally {
      setBusy(false);
    }
  };

  const closePrint = () => {
    print.reset();
    setExportUrl(null);
  };

  const takeAnother = () => {
    print.reset();
    dispatch({ type: 'NEW_SESSION' });
    navigate('/select');
  };

  return (
    <PageFrame
      title="Customize"
      nav={{ onBack: () => navigate('/camera'), backLabel: 'Retake photos' }}
    >
      <div className={styles.layout}>
        <ClipViewer cols={cols} rows={rows}>
          <StripCanvas photos={photos} {...options} />
        </ClipViewer>
        <Customizer
          caption={caption}
          frameColor={frameColor}
          captionColor={captionColor}
          onCaption={(value) => dispatch({ type: 'SET_CAPTION', value })}
          onFrame={(value) => dispatch({ type: 'SET_FRAME', value })}
          onCaptionColor={(value) => dispatch({ type: 'SET_CAPTION_COLOR', value })}
          onReset={() => dispatch({ type: 'RESET_STYLE' })}
          onDownload={onDownload}
          busy={busy}
        />
      </div>
      {exportUrl && (
        <PrinterAnimation
          phase={print.phase}
          src={exportUrl}
          cols={cols}
          rows={rows}
          onDownloadAgain={saveFile}
          onTakeAnother={takeAnother}
          onClose={closePrint}
        />
      )}
    </PageFrame>
  );
}
