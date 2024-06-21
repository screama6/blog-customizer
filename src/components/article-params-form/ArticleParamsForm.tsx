import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select/Select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type ArticleParamsFormType = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormType) => {
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const [selected, setSelected] =
		useState<ArticleStateType>(currentArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const openForm = () => {
		!openMenu ? setOpenMenu(true) : setOpenMenu(false);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentArticleState(selected);
		setOpenMenu(false);
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSelected(defaultArticleState);
		setCurrentArticleState(defaultArticleState);
		setOpenMenu(false);
	};

	function handleChange(name: keyof ArticleStateType, value: OptionType) {
		setSelected((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	return (
		<>
			<ArrowButton onClick={openForm} isOpen={openMenu} />
			<aside
				ref={rootRef}
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: openMenu,
				})}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}>
					<Select
						selected={selected.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption', value)}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={selected.fontSizeOption}
						name='radio'
						onChange={(value) => handleChange('fontSizeOption', value)}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={selected.fontColor}
						onChange={(value) => handleChange('fontColor', value)}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selected.backgroundColor}
						onChange={(value) => handleChange('backgroundColor', value)}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={selected.contentWidth}
						onChange={(value) => handleChange('contentWidth', value)}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
