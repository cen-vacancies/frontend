import { Button, Input, message, Modal, Space } from 'antd'
import s from './chat.module.css'
import Title from 'antd/lib/typography/Title'
import { useContext, useEffect, useMemo, useState } from 'react'
import { chats } from '../../../domain/api/data'
import { components } from '../../../domain/api/types/api-types.ts'
import Paragraph from 'antd/es/typography/Paragraph'
import { UserContext } from '../../../context/user-context.tsx'
import { SendOutlined, LeftOutlined } from '@ant-design/icons'
import { ErrorHandler } from '../../helpers/error-handler.ts'
import { IMAGE_URL } from '../../../constants/constants.ts'

type Props = {
  onClose: VoidFunction
  cvInitial?: components['schemas']['CV']
  vacancyInitial?: components['schemas']['Vacancy']
}

function Chat({ onClose, cvInitial, vacancyInitial }: Props) {
  const { user } = useContext(UserContext)
  const [messageApi, contextHolder] = message.useMessage()

  const [chatList, setChatList] = useState<components['schemas']['ChatsListResponse']['data']>()
  const [activeChat, setActiveChat] = useState<components['schemas']['ChatsListResponse']['data'][0]>()
  const [inputValue, setInputValue] = useState<string>('')
  const [messages, setMessages] = useState<Array<components['schemas']['MessageResponse']>>([])

  const cv_id = activeChat?.cv.id
  const vacancy_id = activeChat?.vacancy.id

  const { connect: connectChat, disconnect: disconnectChat } = useMemo(
    () =>
      cv_id && vacancy_id
        ? chats.chatSocket({
            cv_id,
            vacancy_id,
            onInit: setMessages,
            onNewMessage: (message) => setMessages((prev) => [message, ...prev]),
          })
        : ({} as never),
    [cv_id, vacancy_id],
  )

  useEffect(() => {
    chats.getChats().then((res) => setChatList(res.data))
  }, [])

  useEffect(() => {
    if (!cvInitial || !vacancyInitial || !chatList) {
      return
    }
    for (const item of chatList) {
      if (item.cv.id === cvInitial.id && item.vacancy.id === vacancyInitial.id) {
        setActiveChat(item)
        return
      }
    }
    setActiveChat({
      cv: cvInitial,
      vacancy: vacancyInitial,
      id: 0,
    })
  }, [chatList, cvInitial, vacancyInitial])

  useEffect(() => {
    connectChat?.()
    return () => {
      disconnectChat?.()
      setMessages([])
    }
  }, [connectChat, disconnectChat])

  const handleSubmit = () => {
    chats
      .sendMessage(inputValue, cv_id as number, vacancy_id as number)
      .then((res) => {
        setMessages((prev) => [res, ...prev])
        setInputValue('')
      })
      .catch((e) => {
        console.error(e)
        messageApi.open({
          type: 'error',
          content: ErrorHandler(e),
        })
      })
  }

  const handleSetChat = (item: components['schemas']['ChatsListResponse']['data'][0]) => {
    setActiveChat(item)
  }

  const handleBack = () => {
    setActiveChat(undefined)
    setMessages([])
  }

  const activeChatObject = {
    photo: `${IMAGE_URL}${user?.role === 'applicant' ? activeChat?.vacancy.organization.logo : activeChat?.cv.photo}`,
    title: user?.role === 'applicant' ? activeChat?.vacancy.organization.name : activeChat?.cv.applicant.fullname,
  }

  const classNames = {
    content: s.wrapper,
    body: s.body,
  }
  return (
    <Modal centered open={true} onCancel={onClose} classNames={classNames} footer={[]}>
      {contextHolder}
      <div className={s.root}>
        <Space className={s.aside} data-hide={Boolean(activeChat)} direction={'vertical'} size={10}>
          <Title level={3}>ЧАТЫ</Title>
          {chatList && chatList?.length > 0 && (
            <Space size={15} direction={'vertical'} style={{ width: '100%' }}>
              {chatList.map((item) => (
                <Chat.Preview {...item} onClick={() => handleSetChat(item)} />
              ))}
            </Space>
          )}
        </Space>
        {activeChat && (
          <div className={s.main} data-hide={!activeChat}>
            <div className={s.chatHeader}>
              <Button className={s.buttonBack} shape='circle' icon={<LeftOutlined />} onClick={handleBack} />
              <img src={activeChatObject.photo} className={s.chatImage} />
              <Space className={s.chatHeaderBlock} direction={'vertical'} size={5}>
                <Title level={4} style={{ margin: '0 0 10px' }}>
                  {activeChatObject.title}
                </Title>
                <Paragraph style={{ padding: 0, margin: 0 }}>
                  <span className={s.accent}>Вакансия:</span> {activeChat?.vacancy.title}
                </Paragraph>
                <Paragraph style={{ padding: 0, margin: 0 }}>
                  <span className={s.accent}>Резюме:</span> {activeChat?.cv.title}
                </Paragraph>
              </Space>
            </div>
            <div className={s.chatContent}>
              {messages?.map((item) => {
                let authorName
                if (item.author_id !== user?.id) {
                  authorName = activeChatObject.title
                }
                return (
                  <Chat.Message authorName={authorName} created_at={item.created_at} text={item.text} key={item.id} />
                )
              })}
            </div>
            <Space.Compact>
              <Input
                placeholder={'Сообщение'}
                minLength={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button icon={<SendOutlined />} onClick={handleSubmit} />
            </Space.Compact>
          </div>
        )}
      </div>
    </Modal>
  )
}

Chat.Preview = ({
  vacancy,
  cv,
  onClick,
}: components['schemas']['ChatsListResponse']['data'][0] & { onClick: VoidFunction }) => {
  return (
    <Space className={s.preview} direction={'vertical'} onClick={onClick}>
      <Title level={4} style={{ margin: 0, textTransform: 'uppercase' }}>
        {vacancy.title}
      </Title>
      <Paragraph>{cv.applicant.fullname}</Paragraph>
    </Space>
  )
}

type MessageProps = {
  text: string
  created_at: string
  authorName?: string
}

Chat.Message = ({ text, created_at, authorName }: MessageProps) => {
  const isSelfMessage = authorName === undefined
  return (
    <div className={s.messageWrapper} data-self={isSelfMessage}>
      <Space direction={'vertical'} className={s.message} size={10}>
        <Title style={{ margin: 0, padding: 0 }} level={5}>
          {authorName ?? 'Вы'}
        </Title>
        {text}
        <Paragraph className={s.messageDate} style={{ margin: '0 0 0 auto', padding: 0 }}>
          {new Date(created_at).toLocaleString().slice(0, -3)}
        </Paragraph>
      </Space>
    </div>
  )
}

export default Chat
