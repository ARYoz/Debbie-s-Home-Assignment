package Tagil07.ReportSystem;

public class ReportFactory {

    public static Report createReport(String type, String content, java.util.List<String> decorators) {
        Report report;
        switch (type) {
            case "1":
                report = new IncidentReport(content);
                break;
            case "2":
                report = new MovementReport(content);
                break;
            case "3":
                report = new ContactReport(content);
                break;
            case "4":
                report = new RoutineReport(content);
                break;
            default:
                return null;
        }
        for (String dec : decorators) {
            switch (dec) {
                case "u":
                    report = new UrgentReportDecorator(report);
                    break;
                case "c":
                    report = new ClassifiedReportDecorator(report);
                    break;
                case "t":
                    report = new CommanderTagReportDecorator(report);
                    break;
                case "a":
                    report = new AudioAttachmentReportDecorator(report);
                    break;
            }
        }
        return report;
    }
}

