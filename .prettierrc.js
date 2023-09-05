module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  printWidth: 120, // printWidth default 80 => 100 으로 변경
  tabWidth: 2,
  semi: true,
  endOfLine: 'auto', // EoF 방식, OS별로 처리 방식이 다름

  singleQuote: true, // single 쿼테이션 사용 여부
  jsxSingleQuote: true,
  quoteProps: 'as-needed', // 객체 속성에 쿼테이션 적용 방식
  jsxBracketSameLine: false,

  trailingComma: 'all', // 여러 줄을 사용할 때, 후행 콤마 사용 방식
  bracketSpacing: true, // 객체 리터럴에서 괄호에 공백 삽입 여부
  arrowParens: 'avoid', // 화살표 함수 괄호 사용 방식
  htmlWhitespaceSensitivity: 'css', // HTML 공백 감도 설정

  importOrderSeparation: true,
  importOrderCaseInsensitive: true,
  importOrderSortSpecifiers: true,
};
