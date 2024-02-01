import { Ability } from "@casl/ability"
import { initialAbility } from "./initialAbility"
// import { store } from "../../redux/store"

// const userData = store.getState().auth
// const existingAbility = userData ? userData.ability : null

export default new Ability(initialAbility)
