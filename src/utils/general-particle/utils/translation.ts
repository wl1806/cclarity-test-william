interface ITranslationOptions {
  locale: string
  [key: string]: string
}
const Translate = (translations, key: string, option: any) => {
  const { locale, ...res } = option as ITranslationOptions
  let trans = translations[locale][key]

  Object.keys(res).forEach((o) => {
    trans = trans.replace(`{{${o}}}`, option[o])
  })
  return trans
}

export default Translate
