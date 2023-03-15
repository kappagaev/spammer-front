import { useNotification } from "../../context/NotificationContextProvider"

const styles = {
  notification: "alert",
  error: "alert-danger",
  success: "alert-success",
}
export interface NotificationProps {
  title: string
  message: string
  status: "success" | "error" | "pending"
}
export const Notification = (props: NotificationProps) => {
  const { hideNotification } = useNotification()
  const { title, message, status } = props
  const classes = `${styles.notification} ${
    status === "error" ? styles.error : styles.success
  }`
  return (
    <section className={classes}>
      <h2>{title}</h2>
      <p>{message}</p>
      <button className="btn" onClick={hideNotification}>
        Okay
      </button>
    </section>
  )
}
