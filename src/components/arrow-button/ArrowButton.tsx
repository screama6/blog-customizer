import arrow from 'src/images/arrow.svg';
import React from 'react';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
type Props = {
	onClick: OnClick;
	isOpen: boolean;
};

export const ArrowButton = (props: Props) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx({
				[styles.container]: true,
				[styles.container_open]: props.isOpen,
			})}
			onClick={() => props.onClick()}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({
					[styles.arrow]: true,
					[styles.arrowOpen]: props.isOpen,
				})}
			/>
		</div>
	);
};
