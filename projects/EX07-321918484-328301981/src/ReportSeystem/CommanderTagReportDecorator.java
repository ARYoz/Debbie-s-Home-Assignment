package ReportSeystem;

public class CommanderTagReportDecorator extends ReportDecorator {
    public CommanderTagReportDecorator(Report report) {
        super(report);
    }

    @Override
    public String getContent() {
        return report.getContent() + " [TO COMMANDER]";
    }

    @Override
    public String getType() {
        return report.getType();
    }
}
