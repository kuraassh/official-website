class Network {
  public title: string;
  public totalAtom: string;
  public totalMarketValue: string;
  public currentMarketValue: string;
  public denom: string;
  public voting: {
    title: string;
    atom: any;
    percent: any;
  };
  public selfDelegations: {
    title: string;
    atom: any;
    percent: any;
  };
  public otherDelegations: {
    title: string;
    atom: any;
    percent: any;
  };
  constructor(payload: any) {
    this.title = payload.title;
    this.totalAtom = payload.totalAtom;
    this.totalMarketValue = payload.totalMarketValue;
    this.currentMarketValue = payload.denom;
    this.voting = payload.voting;
    this.title = payload.title;
    this.selfDelegations = payload.selfDelegations;
    this.otherDelegations = payload.otherDelegations;
  }

  static fromJson(data: any) {
    return new Network({
      totalAtom: data.totalAtomFormat,
      totalMarketValue: data.totalMarketValue,
      currentMarketValue: data.currentMarketValue,
      voting: {
        atom: data.totalAtomFormat,
        percent: data.votingPowerPercent,
      },
      selfDelegations: {
        atom: data.totalSelfDelegationsFormat,
        percent: data.totalSelfDelegationsPercent,
      },
      otherDelegations: {
        atom: data.otherDelegationsFormat,
        percent: data.otherDelegationsPercent,
      },
    });
  }
}

export default Network;
