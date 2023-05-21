const redux = require("redux"); // node 상의 import 라 require 를 사용할 것

// reducer 설정
// reducer 는 기존의 상태(state)와 action 값을 프로퍼티로 받는다.
// 또, 무조건 새로운 상태(state)를 리턴해야함.

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "INCREMENT") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "DECREMENT") {
    return {
      counter: state.counter - 1,
    };
  }
  // 기존의 상태를 대체할 새로운 상태를 리턴함
  // 대부분의 애플리케이션에는 상태는 하나의 값 이상을 의미 하기 때문에,
  // 실제로는 객체인 경우가 많다.
  return state;
  //counter: 0,
  //이렇게 작성하는건 비현실적 counter 는 기존의 counter 값에서 + - 를 하는것이 맞다.
  // if문으로 통해 increment 타입을 받을때 증가해야하니 if문 밖에 return 은 state를 반환해야함
  // counter: state.counter + 1,
  // 이양식이 기본적인 리듀서 함수의 모습.
};

// store 설정
// 완성된 리듀서 함수를 createStore 안에 넣는다.
// 어떤 리듀서함수가 store 를 변화시키는지 알아야하기 때문.
// store 와 직접적으로 작동하는건 reducer 함수임.
// createStore 는 더이상 사용안함 /툴킷의 configureStore 를 사용함
const store = redux.createStore(counterReducer);

// 저장소를 구독할 함수와 액션을 작성하자;
const counterSubscriber = () => {
  // 저장소에 getState 를 호출 (createStore 로 생성된 저장소에서 사용할 수 있다.)
  const latestState = store.getState();
  console.log(latestState);
  // 리덕스가 이 함수를 인식하도록 상태가 변경할때마다 이 함수를 실행하라고 말해야함
};
// 저장소의 stroe subscribe 를 호출
// subscribe 안에다가 함수를 작성하면
// 리덕스가 데이터와 스토어의 값이 변경될떄마다 실행해줆
// 중요한점은 countersubscriber 함수는 직접적으로 호출하지 않는다.
store.subscribe(counterSubscriber);

// node redux-demo.js 를 실행하면 counter 함수를 찾을 수 없다고 에러가 뿜음.
// 이유는 저장소가 초기화할때 리덕스가 리듀서함수를 실행하는데 처음에 실행할때 state 의 초기값이 없어서 에러가 뿜음
// state 프로퍼티에 기본값을 정해줘야함

// 실행하면 counter는 1임 이유는 처음에 state가 0 부터 시작하고,  처음으로 실행될 때 1이 증가함.

// swtich 를 이용해보자

// 액션을 전송하는 함수
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
// 일반적으로 리덕스에서 리듀서 내부 다른액션은 다른일을 하는게 목표
// 그래서 리듀서 함수 두번째 인자가 action인 이유 ( 여러 action 을 받기 위해 )
