// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typefield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const points = document.getElementById('points');

// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// ランダムなテキストを表示
const createText = () => {
  // 正タイプした文字列をクリア
  typed = '';
  typefield.textContent = typed;
  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);
  // 配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// キー入力の判定を行う関数。ここのeはイベントオブジェクト。★宣言は？
const keyPress = e => {
  // 誤タイプの場合（入力したキーeとuntypedの1文字目を比較している）
  if(e.key !== untyped.substring(0, 1)) {
    // ここでなぜwrapのidに優先される？★
      wrap.classList.add('mistyped');
      setTimeout(() => {
        wrap.classList.remove('mistyped');
      }, 100);

    return;
  }
  // 正タイプの場合
  score++; // スコアのインクリメント
  
  // スコアによってメッセージ変更
  let scoreComment = '';  
  if(score < 100) {
    scoreComment = `${score} まだまだCランクです。`;
  } else if(score < 200) {
    scoreComment = `${score} Bランクだよ！`;
  } else if(score < 300) {
    scoreComment = `${score} すごい！Aランクだ！`;
  } else if(score >= 300) {
    scoreComment = `${score} Sランク到達！さらに上を目指せ！`;
  }
  points.textContent = scoreComment;
  
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1); // 2文字目から再代入することで、1文字目を削除するってことね。
  typefield.textContent = typed;
  untypedfield.textContent = untyped;

  // untypedのテキストがなくなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
  // テキストを格納する変数を作る
  let text = '';

  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id); // setInterval()で始まったタイマーを止めるメソッド
  const result = confirm(rankCheck(score));

  // OKボタンをクリックされたらリロードする
  if(result == true) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {
  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;
  const id = setInterval(() => {
    // カウントダウンする
    time--;
    count.textContent = time;
    // カウントが0になったらタイマーを停止する
    if(time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
  // カウントダウンタイマーを開始する
  timer();
  // ランダムなテキストを表示
  createText();
  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';
  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';