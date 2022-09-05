import { ASSETS } from "../../environment";

import styles from "./SampleLogo.module.scss";

function SampleLogo() {
    return (
        <div className={styles.sampleLogo}>
            <img src={`${ASSETS}/images/custom-checkout-app.svg`} alt="Custom Checkout App" />
        </div>
    )
}

export default SampleLogo;