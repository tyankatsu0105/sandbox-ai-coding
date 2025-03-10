import "./App.css";
import { useModal } from "~/components/modal";
import { Modal } from "~/components/modal";

function App() {
  const modal = useModal();

  return (
    <>
      <button type="button" onClick={modal.handleOpen}>
        open modal
      </button>

      <Modal
        isOpen={modal.isOpen}
        onClose={modal.handleClose}
        renderBody={() => <>aaaaaaaaa</>}
        renderHeader={() => <>header</>}
        renderFooter={() => (
          <>
            <button type="button" onClick={modal.handleClose}>
              close
            </button>
          </>
        )}
      />
    </>
  );
}

export default App;
