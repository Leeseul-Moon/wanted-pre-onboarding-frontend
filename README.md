## [To-Do List](https://wanted-pre-onboarding-frontend-nu.vercel.app)

## 테스트 정보

- 아이디 : admin@naver.com
- 비밀번호 : adminadmin

## 구현 기능

로그인, 회원가입, To-Do CRUD

## 사용 라이브러리

- react-router v6
- styled-components
- axios

## 실행 방법

```bash

yarn install
yarn start

```

## 폴더 구조

```

📦src
 ┣ 📂apis
 ┃ ┗ 📜request.js
 ┣ 📂components
 ┃ ┣ 📂login_join
 ┃ ┃ ┗ 📜LoginJoinForm.jsx
 ┃ ┗ 📂todo
 ┃ ┃ ┣ 📜TodoForm.jsx
 ┃ ┃ ┣ 📜TodoItem.jsx
 ┃ ┃ ┗ 📜TodoList.jsx
 ┣ 📂hooks
 ┃ ┗ 📜useInput.js
 ┣ 📂pages
 ┃ ┣ 📜LoginJoinPage.jsx
 ┃ ┗ 📜TodoPage.jsx
 ┣ 📜.DS_Store
 ┣ 📜App.jsx
 ┣ 📜index.css
 ┗ 📜index.js

```

## 코드

### api 요청
axios interceptor 를 활용하여 api 요청이 전달되기 전, 헤더에 토큰을 실어주었습니다. <br />
때문에 모든 요청시 헤더에 토큰을 넣어주는 작업을 하지 않아도 됩니다.

``` javascript
// apis/request.js

export const instance = axios.create({
  baseURL: `https://pre-onboarding-selection-task.shop`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    if (ACCESS_TOKEN) {
      config.headers["Authorization"] = ACCESS_TOKEN;
    } else {
     // 로그인 후 todo 페이지로 가면 ACCESS_TOKEN 변수에 값이 담기기 전에 이동 함.
     // 변수가 비어 있으면 로컬스토리지에서 가져와 헤더에 담아 줌. 그 외 요청은 위에서 처리 됨.
      config.headers["Authorization"] = localStorage.getItem("accessToken");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

```

### 리다이렉트
로그인/회원가입 페이지 마운트시 ACCESS_TOKEN 값을 체크 후 값이 있으면 todo 페이지로 가도록 했습니다.

``` javascript
// components/login_join/LoginJoinForm.jsx

  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  useEffect(() => {
    if (ACCESS_TOKEN) {
      navigate("/todo");
    }
  }, [ACCESS_TOKEN, navigate]);

```

### 로그인/회원가입
회원가입 여부인 signup state 상태에 따라 로그인/회원가입 api 요청을 하도록 했습니다.

``` javascript
// components/login_join/LoginJoinForm.jsx

  const onSubmit = async (event) => {
    event.preventDefault();
    if (signup) {
      const res = await onSignUp({ email, password }).catch((error) => console.log(error));
      setLocalStorage(res, 201);
    } else {
      const res = await onLogin({ email, password }).catch((error) => console.log(error));
      setLocalStorage(res, 200);
    }
  };

  const setLocalStorage = (res, statusCode) => {
    if (res.status === statusCode) {
      localStorage.setItem("accessToken", `Bearer ${res.data.access_token}`);
      navigate("/todo");
    }
  };

```

### ToDo CRUD
TodoList 컴포넌트에서 Todo 관련 함수들을 모두 정의한 후 자식 컴포넌트로 내려 줍니다. <br />
TodoItem 컴포넌트는 props 로 받은 함수에 인자를 넣어 실행시킵니다.

``` javascript
// components/todo/TodoList.jsx

  <Container>
    <div>✅ 오늘의 할 일을 적어 주세요!</div>
    <TodoForm todo={todo} inputHandler={inputHandler} add={add} />
    <div>
      {todoList?.map((todo) => (
        <TodoItem key={todo.id} todoItem={todo} remove={remove} update={update} />
      ))}
    </div>
  </Container>

```

