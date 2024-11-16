import { Suspense, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
	const fetcher = async () => {
		const res = await fetch("https://pokeapi.co/api/v2/pokemon");
		return await res.json();
	};

	const state = useData("key2", fetcher);

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				{state.results.map((v) => {
					return v.name;
				})}
			</div>
			<Suspense fallback={<div>loading...</div>}>
				<Component />
			</Suspense>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;

const Component = () => {
	const fetcher = async () => {
		const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
		return await res.json();
	};

	const state = useData("key1", fetcher);

	return (
		<>
			{state?.name}
			<Component2 />
			<Component3 />
		</>
	);
};

const Component2 = () => {
	const fetcher = async () => {
		const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
		return await res.json();
	};

	const state = useData("key3", fetcher);

	return <>{state?.name}</>;
};

const Component3 = () => {
	const fetcher = async () => {
		const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
		return await res.json();
	};

	const state = useData("key4", fetcher);

	return <>{state?.name}</>;
};

const dataMap: Map<string, unknown> = new Map();

export function useData<T>(cacheKey: string, fetch: () => Promise<T>): T {
	const cachedData = dataMap.get(cacheKey) as T | undefined;
	if (cachedData === undefined) {
		throw fetch().then((d) => dataMap.set(cacheKey, d));
	}
	return cachedData;
}
