import Modal from "../common/Modal";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BirdModal = ({ setIsOpen }: Props) => {
  return (
    <Modal setIsOpen={setIsOpen}>
      알림
      <div className="flex flex-col gap-2 w-full items-center justify-center">
        <div className="text-body-sb text-black">음냐냐</div>
        <div className="text-body-sb text-black">음냐냐</div>
      </div>
    </Modal>
  );
};

export default BirdModal;
