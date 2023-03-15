import { TargetForm } from "../../components/form/TargetForm"
import { Target } from "../../types/target"

export const TargetCreate = () => {
  const onSubmit = (target: Target) => {
    console.log(target)
  }
  return <TargetForm onSubmit={onSubmit} />
}
