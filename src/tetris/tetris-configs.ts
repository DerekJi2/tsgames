import $ from 'jquery';
import * as $constants from './utilities/constants';
import { ITetrisConfigs } from './models/tetris-configs.interface';

enum ESelectDDL {
  icon,
  speed,
  background,
}

export class TetrisConfigs implements ITetrisConfigs {
  public speed = 0;
  public iconId = 0;
  public backgroundId = 10;
  public speedIntervals = $constants.speedLevels[0];

  public readonly dropdownlists = {
    icon: 'select#iconSelect',
    speed: 'select#speedSelect',
    background: 'select#bgSelect',
  };

  public readonly labels = {
    speed: 'span#speed',
  };

  public iconChangeCallback = () => {};

  initDropdownLists() {
    this.initIconDDL();
    this.initSpeedDDL();
    this.initBackgroundDDL();
  }

  initIconDDL() {
    const ddl = $(this.dropdownlists.icon);
    for (let i = 0; i < $constants.blockIcons.length; i++) {
      ddl.append(new Option($constants.blockIcons[i], i.toString()));
    }

    ddl.on('change', () => this.onIconChange());
  }

  initSpeedDDL() {
    const ddl = $(this.dropdownlists.speed);
    for (let i = 0; i < $constants.speedLevels.length; i++ ) {
      ddl.append(new Option((i + 1).toString(), i.toString()));
    }
    ddl.val(0);

    ddl.on('change', () => this.onSpeedChange());
  }

  initBackgroundDDL() {
    const ddl = $(this.dropdownlists.background);
    for (let i = 0; i < $constants.bgImages.length; i++ ) {
      ddl.append(new Option('Beauty ' + (i + 1), $constants.bgImages[i]));
    }
    ddl.val($constants.bgImages[this.backgroundId]);

    ddl.on('change', () => this.onBackgroundChange());
  }

  onSpeedChange() {
    const ddl = $(this.dropdownlists.speed);
    const speed = parseInt(ddl.val().toString(), 10);
    this.speedIntervals = $constants.speedLevels[speed];

    $(this.labels.speed).text(speed + 1);
  }

  onIconChange() {
    const ddl = $(this.dropdownlists.icon);
    this.iconId = parseInt(ddl.val().toString(), 10);

    const yVal = this.iconId * (-28);
    $('#imgBlockIcon').css('backgroundPosition', '0px ' + yVal + 'px');

    if (this.iconChangeCallback) {
      this.iconChangeCallback();
      {
        // showNext();
        // showSamples();
      }
    }
  }

  onBackgroundChange() {
    const ddl = $(this.dropdownlists.background);
    const imageSource = ddl.val().toString();

    const leftForm = $('#leftfrm');
    leftForm.css('background', 'url(' + imageSource + ')');
  }
}
