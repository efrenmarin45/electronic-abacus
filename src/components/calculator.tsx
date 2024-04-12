import { useState } from "react";

export const Calculator = () => {
	const [numValue, setNumValue] = useState({ sign: "", num: 0, result: 0 });
	const numbers = [
		"\u00F7",
		"%",
		7,
		8,
		9,
		"x",
		4,
		5,
		6,
		"-",
		1,
		2,
		3,
		"+",
		0,
		".",
		"=",
	];

	const resetClickHandler = () => {
		setNumValue({
			...numValue,
			sign: "",
			num: 0,
			result: 0,
		})
	};
	const percentClickHandler = () => {
		let num = numValue.num.toString() ? parseFloat(numValue.num.toString()) : 0;
		let result = numValue.result.toString() ? parseFloat(numValue.result.toString()) : 0;

		setNumValue({
			...numValue,
			num: (num /= Math.pow(100, 1)),
			result: (result /= Math.pow(100, 1)),
			sign: "",
		});
	};

	const equalsClickHandler = () => {
		if (numValue.sign && numValue.num) {
			const math = (a, b, sign) =>
				sign === "+"
					? a + b
					: sign === "-"
					? a - b
					: sign === "x"
					? a * b
					: a / b;

			setNumValue({
				...numValue,
				result:
					numValue.num.toString() === "0" && numValue.sign === "\u00F7"
						? "Error"
						: math(
								Number(numValue.result),
								Number(numValue.num),
								numValue.sign
						  ),
				sign: "",
				num: 0,
			});
		}
	};

	const dotClickHandler = (e) => {
		const value = e.target.innerHTML;

		setNumValue({
			...numValue,
			num: !numValue.num.toString().includes(".")
				? numValue.num + value
				: numValue.num,
		});
	};

	const signClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;

		setNumValue({
			...numValue,
			sign: value,
			result: !numValue.result && numValue.num ? numValue.num : numValue.result,
			num: 0,
		});
	};

	const numClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;
		if (numValue.num.toString().length < 12) {
			setNumValue({
				...numValue,
				num:
					numValue.num === 0 && value === "0"
						? "0"
						: numValue.num % 1 === 0
						? Number(numValue.num + value)
						: numValue.num + value,
				result: !numValue.sign ? 0 : numValue.result,
			});
		}
	};

	const formatNumberWithComma = (number) => {
		const numString = number.toString();
		const sections = [];
		let count = 0;
		let dotFound = false;

		if (numString.includes(".")) {
			return numString;
		}

		for (let i = numString.length - 1; i >= 0; i--) {
			if (numString[i] === ".") {
				dotFound = true;
				sections.unshift(numString[i]);
			} else if (!dotFound && count === 3) {
				sections.unshift(",");
				count = 0;
			}

			if (!dotFound || numString[i] !== ".") {
				sections.unshift(numString[i]);
				count++;
			}
		}

		return sections.join("");
	};

	return (
		<div className='w-[32rem] h-[39.4rem] px-1 bg-black border border-black rounded-t-2xl shadow-black shadow-lg text-white'>
			<div
				className={
					numValue.num.toString().length > 10
						? "flex justify-end h-32 text-6xl items-center"
						: numValue.num.toString().length >= 8
						? "flex justify-end h-32 text-7xl items-center"
						: "flex justify-end h-32 text-8xl items-center"
				}>
				{numValue.num ? formatNumberWithComma(numValue.num) : numValue.result}
			</div>
			<div className='grid grid-cols-4 gap-1'>
				<button
					className='col-span-2 bg-slate-700 text-6xl hover:bg-slate-600'
					onClick={resetClickHandler}>
					AC
				</button>
				{numbers.map((number, index) => (
					<button
						key={index}
						className={
							number === 0
								? "col-span-2 bg-slate-800 h-24 text-6xl place-content-center hover:bg-slate-700"
								: typeof number === "number"
								? "bg-slate-800 h-24 text-6xl place-content-center text-center hover:bg-slate-700"
								: "bg-amber-600 h-24 text-6xl place-content-center text-center hover:bg-amber-500"
						}
						onClick={
							number === "%"
								? percentClickHandler
								: number === "="
								? equalsClickHandler
								: number === "."
								? dotClickHandler
								: number === "\u00F7" ||
								  number === "x" ||
								  number === "-" ||
								  number === "+"
								? signClickHandler
								: numClickHandler
						}>
						{number}
					</button>
				))}
			</div>
		</div>
	);
};
