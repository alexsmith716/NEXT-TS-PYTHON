import React, { useRef, useState, } from 'react';
import Button from '../Button';

// https://caniuse.com/?search=input%20date
// Safari on iOS does not support Input Date Object property 'max/min'
// of course, there are other ways to accomplish all of this

const DatePicker = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const [inputError, setInputError] = useState(false);
	const [hoursWorked, setHoursWorked] = useState('');
	const [punchInDate, setPunchInDate] = useState('');
	const punchInDateInputRef = useRef(null);
	// ------------------------
	const [punchOutDate, setPunchOutDate] = useState('');
	const punchOutDateInputRef = useRef(null);
	// ------------------------
	const punchInTimeInputRef = useRef(null);
	const [punchInTimeTime, setPunchInTimeTime] = useState('');
	// ------------------------
	const punchOutTimeInputRef = useRef(null);
	const [punchOutTimeTime, setPunchOutTimeTime] = useState('');

	function calculateUtcDst() {
		const inYear = Number(punchInDate.split('-')[0]);
		const inMonth = Number(punchInDate.split('-')[1].replace(/^0+/, ''));
		const inDay = Number(punchInDate.split('-')[2].replace(/^0+/, ''));
		const inHour = Number(punchInTimeTime.split(':')[0].replace(/^0+/, ''));
		const inMinute = Number(punchInTimeTime.split(':')[1].replace(/^0+/, ''));
		// ------
		const outYear = Number(punchOutDate.split('-')[0]);
		const outMonth = Number(punchOutDate.split('-')[1].replace(/^0+/, ''));
		const outDay = Number(punchOutDate.split('-')[2].replace(/^0+/, ''));
		const outHour = Number(punchOutTimeTime.split(':')[0].replace(/^0+/, ''));
		const outMinute = Number(punchOutTimeTime.split(':')[1].replace(/^0+/, ''));
		// ------
		const utcPunchIn = Date.UTC(inYear,inMonth,inDay,inHour,inMinute);
		const utcPunchOut = Date.UTC(outYear,outMonth,outDay,outHour,outMinute);
		const utcDiff = utcPunchOut - utcPunchIn;
		// ------
		const punchInM = new Date(inYear,inMonth-1,inDay,inHour,inMinute).getTime();
		const punchOutM = new Date(outYear,outMonth-1,outDay,outHour,outMinute).getTime();

		return {
			_utcDiff: utcDiff,
			_punchInM: punchInM,
			_punchOutM: punchOutM,
		};
	};

	function clearErrors() {
		setInputError(false);
		setErrorMessage('');
		setHoursWorked('')
	}

	const handlePunchInDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(punchOutDate!==''){
			if(new Date(e.target.value).getTime() > new Date(punchOutDate).getTime()){
				setInputError(true);
				setErrorMessage("Time In Must be Earlier than Time Out");
				return;
			}
		}
		clearErrors();
		setPunchInDate(e.target.value);
	};

	const handlePunchOutDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(punchInDate!==''){
			if(new Date(e.target.value).getTime() < new Date(punchInDate).getTime()){
				setInputError(true);
				setErrorMessage("Time Out Must be Later than Time In");
				return;
			}
		}
		clearErrors();
		setPunchOutDate(e.target.value);
	};

	const handlePunchInTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearErrors();
		setPunchInTimeTime(e.target.value);
	};

	const handlePunchOutTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearErrors();
		setPunchOutTimeTime(e.target.value);
	};

	const handleCalculateHoursClick = () => {
		if(punchInDate!=='' && punchOutDate!=='' && punchInTimeTime!=='' && punchOutTimeTime!==''){
			const millis = calculateUtcDst();
			if(millis._punchInM < millis._punchOutM){
				let dstDiff = millis._punchOutM - millis._punchInM;
				// calculate for DST
				if(dstDiff !== millis._utcDiff){
					if(dstDiff < millis._utcDiff){
						dstDiff += 3600000;
					} else {
						dstDiff -= 3600000;
					}
				}
				const totalHoursWorked = Math.floor(dstDiff/3600000);
				const totalMinutesWorked = Math.floor((dstDiff % 3600000)/60000);
				const hS = totalHoursWorked > 1 || totalHoursWorked == 0 ? 'Hours' : 'Hour';
				const mS = totalMinutesWorked > 1 || totalMinutesWorked == 0 ? 'Minutes' : 'Minute';
				const worked = `Total Time: ${totalHoursWorked} ${hS} and ${totalMinutesWorked} ${mS}`;
				setHoursWorked(worked)
			} else {
				setInputError(true);
				setErrorMessage("Time Out Must be Later than Time In");
			}
		} else {
			setInputError(true);
			setErrorMessage("Please Complete All Input Fields");
		}
	}

	return (
		<div className="container">

			<div className="flex-column align-items-center mb-5 ">

				<div className="time-container-grid-styled bg-color-darkseagreen-1 flex-column align-items-center">

					<div className={`${inputError ? 'mb-3 bg-warn-red container-padding-radius-10 width-fit-content text-color-white' : ''}`}>
						{errorMessage}
					</div>

					<div className="time-container-grid mb-3">
						<div className="text-center">&nbsp;</div>

						<div className="text-center">
							<b>Day</b>
						</div>

						<div className="text-center">
							<b>Time</b>
						</div>

						<div className="container-padding-border-radius-2 width-fit-content">
							<div className="mb-3">
								<b>Time In:</b>
							</div>
							<div>
								<b>Time Out:</b>
							</div>
						</div>

						<div className="container-padding-border-radius-2 width-fit-content">
							<div className="mb-3">
								<input
									type="date"
									max={`${punchOutDate ? punchOutDate : ''}`}
									onChange={handlePunchInDateChange}
									ref={punchInDateInputRef}
								/>
							</div>
							<div>
								<input
									type="date"
									min={`${punchInDate ? punchInDate : ''}`}
									onChange={handlePunchOutDateChange}
									ref={punchOutDateInputRef}
								/>
							</div>
						</div>

						<div className="container-padding-border-radius-2 width-fit-content">
							<div className="mb-3">
								<input
									type="time"
									onChange={handlePunchInTimeChange}
									ref={punchInTimeInputRef}
								/>
							</div>
							<div>
								<input
									type="time"
									onChange={handlePunchOutTimeChange}
									ref={punchOutTimeInputRef}
								/>
							</div>
						</div>
					</div>

					<div>
						<p>{hoursWorked}</p>
					</div>

					<div>
						<Button
							className={`btn-primary btn-md ${inputError ? 'disabled' : ''}`}
							onClick={handleCalculateHoursClick}
							buttonText="Calculate Hours"
						/>
					</div>
				</div>

			</div>

		</div>
	);
};

export default DatePicker;
