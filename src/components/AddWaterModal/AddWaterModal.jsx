import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Svg } from '../Icons/icons.jsx';
import { format } from 'date-fns';

export const AddWaterModal = ({ closeModal }) => {
    const dispatch = useDispatch();
    const [amount, setWaterDose] = useState(0);
    const [inputWaterDose, setInputWaterDose] = useState('');
    const [date, setTime] = useState(currentTime());

    function currentTime() {
      const now = new Date();
      const hours = String(now.getHours());
      const minutes = String(now.getMinutes()).padStart(2, '0');

      return `${hours}:${minutes}`;
    }

    const decreaseDose = () => {
        setWaterDose(prev => Math.max(prev - 50, 0));
      };
      const increaseDose = () => {
        setWaterDose(prev => prev + 50);
      };
      const handleTime = event => {
        setTime(event.target.value);
      };

      const handleInputWaterDoseChange = event => {
        setInputWaterDose(event.target.value);
      };

      const handleInputWaterDoseBlur = () => {
        let newWaterDose = Math.round(Number(inputWaterDose) / 50) * 50;
        setWaterDose(Number(inputWaterDose));
        setInputWaterDose(newWaterDose.toString());
      };

      useEffect(() => {
        setInputWaterDose(amount.toString());
      }, [amount]);

      const timeOptions = () => {
        const options = [];
        for (let h = 0; h < 24; h++) {
          for (let m = 0; m < 60; m += 5) {
            const timeString = `${h.toString()}:${m.toString().padStart(2, '0')}`;
            options.push(
              <option key={timeString} value={timeString}>
                {timeString}
              </option>
            );
          }
        }
        return options;
      };

      const handleSubmit = async event => {
        event.preventDefault();

        const [hours, minutes] = date.split(':').map(Number);
        const currentDate = new Date();
        currentDate.setHours(hours);
        currentDate.setMinutes(minutes);
        const isoDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss");
       if(amount===0){
        closeModal();
        return;
       }
        try {
          const result = await dispatch(addWaterThunk({ amount, date: isoDate }));
          if (result.meta.requestStatus === 'fulfilled') {
            closeModal();
          }
        } catch (error) {
          console.error(error);
        }
      };
      return (
        <>
            <h2>Add water</h2>
            <button type="button" onClick={closeModal}>
              <Svg id={'#icon-close'} width={24} height={24} />
          </button>
          <p>Choose a value:</p>
              <p>Amount of water:</p>
              <button onClick={decreaseDose} disabled={amount === 0}>
                <Svg id={'#icon-minus'} width={10} height={14} />
                </button>
                <span>{amount}ml</span>
              <button onClick={increaseDose}>
                <Svg id={'#icon-plus'} width={14} height={14 }/>
                </button>

          <form onSubmit={handleSubmit}>
              <p>Recording time:</p>
                <select value={date} onChange={handleTime}>
                  {timeOptions()}
                </select>

              <label>
                Enter the value of the water used:
              </label>
              <input
                type="text"
                value={inputWaterDose}
                onChange={handleInputWaterDoseChange}
                onBlur={handleInputWaterDoseBlur}
              />

              <p>{amount}ml</p>
              <button type="submit">
                Save
              </button>
          </form>
        </>
      );
    };
