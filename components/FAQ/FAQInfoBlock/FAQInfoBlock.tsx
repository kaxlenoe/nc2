import styles from './FaqInfoBlock.module.scss'
import cls from 'classnames'
import Image from 'next/image'
import arrowTopIcon from 'public/icons/arrow_more.svg'
import { FC } from 'react'

interface FAQInfoBlockProps {
    showContent: boolean
    setShowContent: ( prev: boolean ) => void
    title: string
}

const FAQInfoBlock: FC<FAQInfoBlockProps> = ( {
    title,
    showContent,
    setShowContent,
} ) => {
    return (
        <>
            <div
                className={ styles.title_block }
                onClick={ () => setShowContent( !showContent ) }
            >
                <div className={ styles.filter_wrapper }>
                    <h2 className={ styles.title }>{ title }</h2>
                </div>

                <div
                    className={ cls( styles.title_icon, {
                        [ styles.hidden_content ]: !showContent,
                    } ) }
                >
                    <Image
                        src={ arrowTopIcon }
                        width={ 24 }
                        height={ 24 }
                        alt="arrow top icon"
                    />
                </div>
            </div>
        </>
    )
}

export default FAQInfoBlock
