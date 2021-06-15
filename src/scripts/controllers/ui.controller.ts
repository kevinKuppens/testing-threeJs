export class UiController{
    static init = () => {

        const scoreUi = `<div id='score-ui'> 
            <p class='ui-title'>Score :</p>
            <p id='score-value'></p>
        </div>`;

        const levelUi = `<div id='level-ui'> 
            <p class='ui-title'>Level :</p>
            <p id='level-value'></p>
        </div>`;

        const pauseUi = `<div id='pause-menu' class='hidden'>
        <p>Pause</p>
            <button>options</button>
            <button>back to main menu</button>
            <button>back</button>
        </div>`;
         const divUi = document.createElement('div');
         const frame: HTMLElement = document.getElementById('container') as HTMLElement;
         divUi.innerHTML = scoreUi + levelUi + pauseUi;
         frame.append(divUi);
    }

    static displayScore(scoreValue:number, field:HTMLElement){
       field.innerText = scoreValue.toString();
    }
}