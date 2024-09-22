import ApiService from '@/api/ApiService'
import type ICreateConversation from '@/interfaces/ICreateConversation'
const useConversationApi = () => {
  const api = new ApiService()

  const createConversation = (config: ICreateConversation) => {
    return api.POST('create-conversation', config)
  }
  return { createConversation }
}
export default useConversationApi
