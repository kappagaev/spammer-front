import React, { ReactNode, useContext, useState } from "react"
import { NotificationProps } from "../components/UI/Notification"

interface NotificationContextType {
  notification: NotificationProps | null
  showNotification: (notificationData: NotificationProps) => void
  hideNotification: () => void
}
const notificationContext = React.createContext<NotificationContextType>({
  notification: null,
  showNotification: () => undefined,
  hideNotification: () => undefined,
})

interface Props {
  children: ReactNode
}
export const NotificationContextProvider = (props: Props) => {
  const [activeNotification, setActiveNotification] =
    useState<NotificationProps | null>(null)
  const showNotificationHandler = (notificationData: NotificationProps) => {
    console.log(notificationData)
    console.log("I am here")
    setActiveNotification(notificationData)
  }
  const hideNotificationHandler = () => {
    setActiveNotification(null)
  }
  const context: NotificationContextType = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  } as NotificationContextType
  return (
    <notificationContext.Provider value={context}>
      {props.children}
    </notificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(notificationContext)
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationContextProvider"
    )
  }
  return context
}
