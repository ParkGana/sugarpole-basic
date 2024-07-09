import './App.css'
import Number from './components/number'
import Sign from './components/sign'

function App() {
    return (
        <div className="grid gap-5 bg-[#242530] p-[25px]">
            <div className="w-full h-[70px] leading-[70px] bg-[#3a3f77] text-3xl text-white text-right rounded-[20px] px-8">
                0
            </div>
            <div className="grid grid-cols-[auto_auto] gap-5">
                <div className="grid grid-cols-3 gap-4">
                    <Number value={1} />
                    <Number value={2} />
                    <Number value={3} />
                    <Number value={4} />
                    <Number value={5} />
                    <Number value={6} />
                    <Number value={7} />
                    <Number value={8} />
                    <Number value={9} />
                    <Number value={'.'} />
                    <Number value={0} />
                    <Number value={'cancel'} />
                </div>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Sign value={'multiply'} />
                        <Sign value={'divide'} />
                        <Sign value={'plus'} />
                        <Sign value={'minus'} />
                        <Sign value={'remain'} />
                        <Sign value={'square'} />
                    </div>
                    <Sign value={'calculate'} />
                </div>
            </div>
        </div>
    )
}

export default App
