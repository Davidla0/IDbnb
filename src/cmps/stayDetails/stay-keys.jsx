import { ReactComponent as Security } from '../../assets/icons/security.svg';
import { ReactComponent as Location } from '../../assets/icons/location.svg';
import { ReactComponent as Footprint } from '../../assets/icons/footprint.svg';

export const StayKeys = () => {
    return <div className="some-keys">
    <div className="guest-impression">
        <div className="logo"><Location /></div>
        <div className="txt">
            <div className="header">Great location</div>
            <div className="description">100% of recent guests gave the location a 5-star rating.</div>
        </div>
    </div>
    <div className="guest-impression">
        <div className="logo"><Security /></div>
        <div className="txt">
            <div className="header">Great check-in experience</div>
            <div className="description">100% of recent guests gave the check-in process a 5-star rating.</div>
        </div>
    </div>
    <div className="guest-impression">
        <div className="logo"><Footprint /></div>
        <div className="txt">
            <div className="header">Furry friends welcome</div>
            <div className="description">Bring your pets along for the stay.</div>
        </div>
    </div>
</div>
}