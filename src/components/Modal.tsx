import React, { useEffect } from 'react'
import { Card, Modal} from 'react-bootstrap'
import styles from "@/css/Home.module.scss"

// { } post 단 건
interface Post {
    id: number
    name: string
    description: string
    image: string
    thumb: string
    url: string
}

// [ ] post 다 건 !
interface postsProps {
    show: boolean
    onHide: () => void
    detailInfo: Post
}

// onHide: () => void;

const Modals: React.FC<postsProps> = ({ show, onHide, detailInfo }: postsProps) => {

    const onClickCard = (url : string) => {
        console.log(url)
        url ? window.open(url) : alert('사이트 연결을 곧 준비하겠습니다.' )
    }

    const listener = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        } else if (e.key === 'Escape' && e.keyCode === 27) {
            e.preventDefault()
            onHide()
        } else {
            e.preventDefault()
            return false
        }
    }

    useEffect(() => {
        document.body.classList.add('body_fixed')
        document.body.addEventListener('keydown', listener)
        return () => {
            document.body.classList.remove('body_fixed')
            document.body.removeEventListener('keydown', listener)
        }
    }, [])

    return (
        <div>
            <Modal
                show={ show }
                onHide={ onHide }
                size={'sm'}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        { detailInfo.name }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className={`${styles.card} bg-dark text-white`} onClick={ () => onClickCard(detailInfo.url) }>
                        <Card.Img src={detailInfo.image} alt="Card image"/>
                        <Card.Footer className="text-muted">{ detailInfo.description }</Card.Footer>
                    </Card>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Modals
