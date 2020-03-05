import DRAFT_BODY from './constants'

export default (bodyText = '', codeBlocks = {}) => {
  return {
    type: DRAFT_BODY,
    body: { bodyText, codeBlocks },
  }
}