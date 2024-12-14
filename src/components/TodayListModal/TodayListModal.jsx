import React, { useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';

const TodayListModal = ({
  isOpen,
  onClose,
  initialAmount,
  initialTime,
  onSave,
}) => {
  const [amount, setAmount] = useState(initialAmount || '');
  const [time, setTime] = useState(initialTime || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !time) {
      console.log('Err');
      return;
    }
    onSave({ amount, time });
    onClose();
  };

  return (
    <ModalContainer onClose={onClose}>
      <div>
        <h2>Edit the entered amount of water</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">
            Correct entered data:
            <div>
              <button
                onClick={() => setAmount((prev) => Math.max(0, prev - 50))}
              >
                -
              </button>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                required
              />
              <button onClick={() => setAmount((prev) => +prev + 50)}>+</button>
            </div>
          </label>
          <label>
            Recording time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              name=""
              id=""
              required
            />
          </label>
          <div>
            <button type="button" onClick={onClose}>
              Cansel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default TodayListModal;
