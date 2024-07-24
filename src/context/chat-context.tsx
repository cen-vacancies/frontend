import { createContext, ReactNode, useState } from 'react'
import Chat from '../presentations/ui/chat/chat.tsx'
import { components } from '../domain/api/types/api-types.ts'

export type ChatContext = {
  open: (cv?: components['schemas']['CV'], vacancy?: components['schemas']['Vacancy']) => void
}

export const ChatContext = createContext<ChatContext>({
  open: () => {},
})

export default function ChatContextProvider({ children }: { children: ReactNode }) {
  const [chatObject, setChatObject] = useState<
    | {
        cv?: components['schemas']['CV']
        vacancy?: components['schemas']['Vacancy']
      }
    | undefined
  >()

  const open = (cv?: components['schemas']['CV'], vacancy?: components['schemas']['Vacancy']) => {
    setChatObject({ cv, vacancy })
  }

  const close = () => {
    setChatObject(undefined)
  }

  return (
    <ChatContext.Provider value={{ open }}>
      {children}
      {chatObject && <Chat onClose={close} cvInitial={chatObject.cv} vacancyInitial={chatObject.vacancy} />}
    </ChatContext.Provider>
  )
}
