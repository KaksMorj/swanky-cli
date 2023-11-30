import { Listr } from "listr2";
import { remove } from "fs-extra";
import { SwankyCommand } from "../../lib/swankyCommand.js";

export default class Clear extends SwankyCommand<typeof Clear> {
  static description = "Clear artifacts and target folder";
  public async run(): Promise<void> {
    const spinner = new Listr([
      {
        title: "Clear artifacts",
        task: async () => {
          try {
            await remove("artifacts");
          } catch (e) {
            this.logger.error(e);
          }
        },
      },
      {
        title: "Clear target",
        task: async () => {
          try {
            await remove("target");
          } catch (e) {
            this.logger.error(e);
          }
        },
      },
      {
        title: "Clear test artifacts",
        task: async () => {
          for (const contractName in this.swankyConfig.contracts) {
            try {
              await remove(`tests/${contractName}/artifacts`);
            } catch (e) {
              this.logger.error(e);
            }
          }
        },
      }
    ]);
    await spinner.run();
  }
}
