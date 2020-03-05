import { DRAFT_BODY } from './constants'

export const draftBody = (bodyText = '', codeBlocks = {}) => {
  return {
    type: DRAFT_BODY,
    body: { bodyText, codeBlocks },
  }
}