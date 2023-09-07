# 한국임상정보 사이트 검색창

질환명 검색시 API 호출 통해서 검색어 추천 기능 구현하기

- 검색창 구현
- 검색어 추천 기능 구현
- 캐싱 기능 구현 (라이브러리 사용하지 않고)

## 🔗 배포 링크

https://clinical-trial-search-je868jolz-haron-lee.vercel.app/

<br>

![image](https://github.com/haron-lee/github-issues-list/assets/88657261/9c16db3a-40b4-43bf-abf0-83532cf8ab85)

<br>

## 🛠️ 배포 구현

Glitch를 사용하여 db.json을 임의 서버로 구축하여 Glitch live site를 환경변수에 저장 후 Vercel로 배포

<br>

## 🚀 기능 구현

### 1. 검색어 추천 기능 구현

- json-server 라이브러리를 사용하여 db.json 파일에 검색에 필요한 데이터를 저장
- localhost:4000 port를 사용하여 axios 라이브러리 get method를 활용하여 api 통신 기능을 구현
- axios의 params를 활용하여 q에 검색어 키워드를 넣어 주어 해당 검색어에 해당하는 데이터 값을 찾기
- api 통신시 query string에 `_limit=10`을 사용하여 검색어에 해당하는 데이터 중 검색어에 가장 가까운 값 10개씩 데이터 불러오기

```tsx
const searchHttp = new Http(`${process.env.REACT_APP_DISEASE_DB}`);

export const getKeyword = async (keyword: string | undefined) => {
  return await searchHttp.get<Disease[]>('/sick?_limit=10', {
    params: {
      q: keyword,
    },
  });
};
```

<br>

### 2. API 호출별로 로컬 캐싱 기능 구현

- useCachedData hook을 사용하여 API가 호출 된 후 캐싱된 데이터 값이 없다면 검색어(key), 검색데이터(value), 저장된시간(timestamp)로 SessionStorage에 저장
  - SesstionStorage를 선택한 이유는 LocalStorage처럼 창이 닫혀도 영구적으로 저장될 필요성을 느끼지 못했고 새로고침시에는 여러가지의 이유로 사용자가 새로고침 했을 가능성에 대비하여 캐싱 값이 존재함으로 불필요한 API 호출을 줄일 수 있다고 생각했기 때문
- 다른 검색어로 검색시 해당 검색어가 있는지 캐싱 데이터에서 탐색 후에 없으면 API를 호출, 있다면 캐싱 데이터를 보여주는 로직
- 검색시에 캐싱된 데이터의 검색 당시의 저장된 시간이 5분이상 만료하였을 경우 해당 캐싱 데이터를 삭제 및 새로운 API를 호출
- 캐싱 데이터 사용시 `console.info('calling caching data')`로 캐싱 데이터 사용 횟수를 확인 할 수 있습니다.

<br>

### 3. 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

- lodash 라이브러리의 debounce 기능을 사용하여 인자로 받은 delay 값으로 search input의 change event가 발생하면 delay 값 뒤에 API 호출
- api 통신시 `console.info('calling api')`로 api 통신 횟수를 확인 할 수 있습니다.

> 2번, 3번 기능 구현 `useCachedData hook`

```tsx
function useCachedData(key: string, fetcher: () => Promise<any>, delay: number) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!key) {
      setData(null);
      return;
    }

    const debouncedFetch = debounce(async () => {
      let result;

      const cachedItem = sessionStorage.getItem(key);

      if (cachedItem && Date.now() - JSON.parse(cachedItem).timestamp <= EXPIRE_TIME) {
        result = JSON.parse(cachedItem).data;
        console.info('calling caching data');
      } else {
        result = await fetcher();
        console.info('calling api');

        if (result !== undefined) {
          sessionStorage.setItem(
            key,
            JSON.stringify({
              data: result,
              timestamp: Date.now(),
            }),
          );
        }
      }

      setData(result);
    }, delay);

    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [key, fetcher, delay]);

  useEffect(() => {
    const cleanupExpiredItems = () => {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);

        if (key) {
          const cachedItemStr = sessionStorage.getItem(key);

          if (cachedItemStr) {
            const cachedItemObj = JSON.parse(cachedItemStr);

            if (Date.now() - cachedItemObj.timestamp > EXPIRE_TIME) {
              sessionStorage.removeItem(key);
            }
          }
        }
      }
    };

    cleanupExpiredItems();

    const intervalId = setInterval(cleanupExpiredItems, delay);

    return () => clearInterval(intervalId);
  }, [delay]);

  return data;
}
```

<br>

### 4. 키보드만으로 추천 검색어들로 이동 가능하도록 구현

- input에 검색 후 onKeyDown 이벤트 함수(moveKeyword)로 이벤트 핸들링
- moveKeyword 함수에 event.key 값을 switch문을 사용하여 case에 따라 selectedIndex의 값 변경
- case는 up, down, enter로 up일 경우 index에 -1, down일 경우 index에 +1, up과 down시 마지막 위치일 경우 index 초기화 혹은 데이터의 마지막 index 값으로 이동. enter 입력시 새탭 구글 검색으로 이동

> input이 onBlur 되거나, esc key를 활용하여 esc를 눌렀을 경우 추천 검색어 창이 온오프 될 수 있도록 사용성을 늘릴 수 있도록 리팩토링 필요

```tsx
const moveKeyword = (event: React.KeyboardEvent) => {
  if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown' && event.key !== 'Enter') return;
  if (event.nativeEvent.isComposing) return;

  if (disease.length > 0) {
    switch (event.key) {
      case 'ArrowUp':
        setSelectedIndex((prevIndex) => (prevIndex <= 0 ? disease.length - 1 : prevIndex - 1));
        break;
      case 'ArrowDown':
        setSelectedIndex((prevIndex) => (prevIndex >= disease.length - 1 ? 0 : prevIndex + 1));
        break;
      case 'Enter':
        if (disease[selectedIndex]) {
          navigateGoogleSearch(`https://www.google.com/search?q=${disease[selectedIndex].sickNm}`);
        }
        break;
      default:
    }
  }
};
```

<br>

### 5. 검색어 없을 시 ‘검색어 없음’ 표출

- fetching 해온 데이터 값의 길이가 0일 경우에 삼항 연산자를 활용하여 '검색어 없음'을 렌더링

```tsx
const SelectList: React.FC<SelectProps> = ({ disease, selectedIndex }) => {
  return (
    <StyledUl>
      <li>
        <StyledP>추천 검색어</StyledP>
      </li>
      {disease.length === 0 ? (
        <NoKeyword>검색어 없음</NoKeyword>
      ) : (
        disease.map((diseaseItem, index) => {
          const isSelected = index === selectedIndex;
          return (
            <SelectItem key={diseaseItem.sickCd} disease={diseaseItem} $isSelected={isSelected} />
          );
        })
      )}
    </StyledUl>
  );
};
```

<br>

## ⚙️ 실행 방법

```
npm install
npm run start
```

<br>

## 📂 폴더 구조

```
project-root/
│
├── public/
│ ├── index.html
│ └── manifest.json
│
├── src/
│ ├── api/
│ ├── components/
│ ├── context/
│ ├── hooks/
│ ├── pages/
│ ├── router/
│ ├── utils/
│ ├── App.tsx
│ ├── GlobalStyle.ts
│ ├── types.ts
│ └── index.tsx
│
├── .env
├── .eslintrc
├── .gitignore
├── .lintstagedrc
├── .prettierrc.js
├── package.json
├── tsconfig.json
└── README.md


```

<br>

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/Typescript-blue?style=square"/> <img src="https://img.shields.io/badge/React-61DAFB?style=square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/lodash-3492FF?style=square&logo=lodash&logoColor=white"/> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/vercel-000000?style=square&logo=vercel&logoColor=white"/> <img src="https://img.shields.io/badge/glitch-3333ff?style=square&logo=glitch&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=square&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/git-F05032?style=square&logo=git&logoColor=white">
