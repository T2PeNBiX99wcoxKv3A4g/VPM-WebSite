import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";
import {App} from "./App";
import {loadListingData} from "./listing-data";

const container = document.getElementById("root");

if (!container) {
    throw new Error("Missing #root container");
}

void loadListingData().then(data => {
    createRoot(container).render(
        <StrictMode>
            <App data={data}/>
        </StrictMode>
    );
});
