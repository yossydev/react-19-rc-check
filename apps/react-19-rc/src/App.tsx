import React, { Suspense } from "react";

// 非同期コンポーネントA: 1秒後に開始、さらに2秒後に解決
const LazyComponent1 = React.lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(() => {
				console.log("LazyComponent1 開始");
				setTimeout(() => {
					console.log("LazyComponent1 完了");
					resolve({ default: () => <div>コンポーネントA</div> });
				}, 2000);
			}, 1000); // 1秒後に開始
		}),
);

// 非同期コンポーネントB: 4秒後に開始、さらに2秒後に解決
const LazyComponent2 = React.lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(() => {
				console.log("LazyComponent2 開始");
				setTimeout(() => {
					console.log("LazyComponent2 完了");
					resolve({ default: () => <div>コンポーネントB</div> });
				}, 2000);
			}, 4000); // 2秒後に開始
		}),
);

function App() {
	return (
		<div>
			<h1>React 18 vs React 19: Suspense Fallback Timing</h1>

			{/* Suspense Boundary */}
			<Suspense fallback={<div>ローディング中...</div>}>
				<div style={{ display: "flex", gap: "20px" }}>
					<LazyComponent1 />
					<LazyComponent2 />
				</div>
			</Suspense>
		</div>
	);
}

export default App;
