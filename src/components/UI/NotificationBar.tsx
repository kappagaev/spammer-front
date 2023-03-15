import { useNotification } from "../../context/NotificationContextProvider"
import { Notification } from "./Notification"

export const NotificationBar = () => {
  const { notification } = useNotification()

  return notification != null ? <Notification {...notification} /> : null
}
