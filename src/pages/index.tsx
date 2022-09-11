import type {GetStaticProps, NextPage} from 'next'
import React, {useState} from 'react'
import { Card, Col, Container, Row} from 'react-bootstrap'
import styles from "@/css/Home.module.scss"
import Modal from "@/compo/Modal"

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
	posts: Post[]
}

// const Home: NextPage = ({ posts }) => {
// 리액트 fragment return
const Home: React.FC<postsProps> = ({ posts }) => {
	const [ show, setShow ] = useState(false)
	const [ detail, setDetail ] = useState({})
	const hideModal = () => {
		setShow(false)
	}

	// 파라미터 post 타입
	const openModal = (v: Post) => {
		setShow(true)
		setDetail(( prev ) => {
			return { ...prev, ...v }
		})
	}

	return (
		<>
			<Modal show={ show} onHide={ hideModal } detailInfo={ detail } />
			<main>
				<h2 className="text-lg-start mb-lg-5">EAT</h2>
				<Container>
					<Row className="justify-content-md-center">
						{ posts && posts.map((v, i) => {
							return (
								<Col lg="3">
									<Card className={`${styles.card} bg-dark text-white m-5`} onClick={ () => openModal(v) }>
										<Card.Img src={v.thumb} alt="Card image"/>
									</Card>
								</Col>
							)
						})
						}
					</Row>
				</Container>
			</main>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const res = await fetch('http://localhost:9000/stores/')
	const posts = await res.json()
	return {
		props: {
			posts
		}
	}
}


export default Home
